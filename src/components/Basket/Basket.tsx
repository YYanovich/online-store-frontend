import { useBasket } from "../../hooks/useBasket";
import cartImg from "../../assets/shopping-cart.png";
import cartImgWhite from "../../assets/shopping-cart-white.png";
import styles from "./Basket.module.scss";
import { useTheme } from "../../context/ThemeContext";

const Basket = () => {
  const { items } = useBasket();
  const { theme } = useTheme();
  const length = items.length;
  const isDark = theme === "dark";
  return (
    <div className={styles.cartWrapper}>
      <img src={isDark ? cartImgWhite : cartImg} alt="Cart"></img>
      {length > 0 && <div className={styles.cartBadge}>{length}</div>}
    </div>
  );
};
export default Basket;
