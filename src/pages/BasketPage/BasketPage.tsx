import { useBasket } from "../../hooks/useBasket";
import { useEffect } from "react";
import styles from "./Basket.module.scss";
import Star from "../../assets/star.png";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Alert,
  Spinner,
  ListGroupItem,
} from "react-bootstrap";
const Basket = () => {
  const { getItems, deleteItem, totalPrice, items, loading } = useBasket();
  useEffect(() => {
    getItems();
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }
  if (items.length === 0) {
    return <Alert variant="info">Your cart is empty</Alert>;
  }
  return (
    <Container>
      <hr />
      <Row className="mb-3">
        <Col md={2}>
          <strong></strong>
        </Col>
        <Col md={4} className="text-center">
          <strong>Name</strong>
        </Col>
        <Col md={2} className="text-center">
          <strong>Price</strong>
        </Col>
        <Col md={1} className="text-center">
          <strong>Rating</strong>
        </Col>
        <Col md={3}></Col>
      </Row>
      <ListGroup>
        {items.map((item) => (
          <ListGroupItem key={item.id} className={styles.basketItem}>
            <Row className="align-items-center">
              <Col md={2}>
                <Image src={`/${item.img}`} className={styles.itemImage} />
              </Col>
              <Col md={4} className="text-center">
                <h4 className={styles.productName}>{item.name}</h4>
              </Col>
              <Col md={2} className="text-center">
                <h5>{item.price} hrn</h5>
              </Col>
              <Col md={1} className="d-flex justify-content-center">
                <div className={styles.rating}>
                  <span className={styles.ratingValue}>{item.rating}</span>
                  <Image
                    src={Star}
                    className={styles.ratingStar}
                    alt={`${item.rating} star rating`}
                  />
                </div>
              </Col>
              <Col md={3} className="d-flex justify-content-end">
                <Button variant="danger" onClick={() => deleteItem(item.id)}>
                  Delete product
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
      <Card className={styles.summaryCard}>
        <Card.Body className={styles.summaryBody}>
          <div className={styles.summaryInfo}>
            <span className={styles.summaryLabel}>Total to pay</span>
            <span className={styles.summaryAmount}>
              {totalPrice.toLocaleString()} hrn.
            </span>
          </div>
          <Button className={styles.summaryButton} variant="success">
            Go to payment
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Basket;
