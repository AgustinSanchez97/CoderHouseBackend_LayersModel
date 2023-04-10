import { faker } from "@faker-js/faker";



faker.locale = "es";

export const generateTicket = (numberOfProducts = 10) => {
  /*
    const numberOfProducts = parseInt(
    faker.random.numeric(1, { bannedDigits: [0] })
  );
   */
  const products = [];
  const date = new Date().toString()
  


  for (let i = 0; i < numberOfProducts; i++) {
    products.push(generateProduct());
  }

  //RETURN DE TICKET
/*
  return {
    code: faker.random.alphaNumeric(10),
    date: date,
    products,
    email: faker.internet.email()
  }
*/
  //RETURN SOLO DE PRODUCTOS
  return {
    products
  }
};

const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),    
    category: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    stock: faker.random.numeric(1)
  }
};
