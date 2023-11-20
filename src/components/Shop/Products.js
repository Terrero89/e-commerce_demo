import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "the gladiator",
    description: "The gladiator returns II",
  },

  {
    id: "p2",
    price: 4,
    title: "the Ninja Turtles",
    description: "Atomic but strong ninja turtle that like pizza",
  },

  {
    id: "p3",
    price: 10,
    title: "Sergio The programer",
    description: "the book about becoming what you want to become",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
