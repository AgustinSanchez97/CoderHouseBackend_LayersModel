import { Router as expressRouter } from "express";
import jwt from "jsonwebtoken";
import CustomError from '../services/CustomError.js';
import ErrorList from '../services/enums.js';
import { generateUserError, paramError } from '../services/info.js';

export default class Router {
  constructor() {
    this.router = expressRouter();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {} // Este metodo va a ser sobreescrito por las clases hijas

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callbacks)
    );
  }

  handlePolicies = (policies) => (req, res, next) => {
    //console.log( req.session.user.role)
//si esta sin parametros devolver un mensaje
    if(typeof policies == "function") return res.status(403).json({ message: "Forbidden" });

    if (policies.includes("PUBLIC")) return next();
    //if (policies[0] === "PUBLIC") return next();
    
    const authToken =req.cookies["token"]
    //req.headers["authorization"] || req.headers["Authorization"];

    //if (!authToken) return res.status(401).json({ message: "No token provided" });
    
/*
//Prueba de Error custom
    if (!authToken)
    {
      CustomError.createError({
        name: 'Cookie faltante para autenticar token',
        cause: paramError(authToken),
        message: 'Try to relogin in the main page',
        code: ErrorList.INVALID_PARAMS
      })
    }
*/

/*
    //const token = authToken.split(" ")[1];
    const token = authToken.split(" ")[1];
    console.log(jwt.verify(token, "coderSecret") )
    const user = jwt.verify(token, "coderSecret");*/
    //if (!policies.includes(user.role.toUpperCase()))    
    if(!req.session.user) return res.status(404).redirect("/login");
    if (!policies.includes(req.session.user.role.toUpperCase()))
      return res.status(403).json({ message: "Forbidden" });
    //req.user = user;
    next();
  };

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (data) => {
      res.status(200).json({ data });
    };
    res.sendServerError = (error) => {
      res.status(500).json({ error });
    };
    res.sendUserError = (error) => {
      res.status(400).json({ error });
    };
    next();
  };

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).json({ error: error.message });
      }
    });
  }
}
