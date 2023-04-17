import winston from "winston";
import config from "../config/config.js"


//debug, http, info, warning, error, fatal
const customLevels = {
    levels: {
      debug: 0,
      http: 1,
      info: 2,
      warning: 3,
      error: 4,
      fatal: 5,
    },
    colors:{        
        http: "white",
        info: "blue",
        warning: "yellow",
        error: "orange",
        fatal: "red",
    }
  }


const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports:[
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(winston.format.colorize({colors: customLevels.colors}))
        }),
        new winston.transports.Console({
            level: "error",
            format: winston.format.combine(winston.format.colorize({colors: customLevels.colors}))
        }),
        new winston.transports.File({
            filename: "error.log",
            level: "error"
        })
    ]
})

const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports:[
        new winston.transports.Console({
            level: "debug"
        })
    ]
})


export const addLogger = (req,res,next)=>{    
    if(config.role != "development")
    {
        req.logger = prodLogger
        req.logger.info(`${req.method} en la ruta ${req.url} - ${new Date().toLocaleTimeString()}`)
    }

    else
    {
        req.logger = devLogger
        req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    }
    
    
    next()
}