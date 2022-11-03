

import org.junit.jupiter.api.Test;

public class InventoryTest {

    @Test
    public void delete() {
        ProductEntity product = new ProductEntity();
        product.setId(7);
        setup.delete(product);
    }

    @Test
    public void getAllProducts() {
        System.out.println(setup.getAllProduct());
    }

    @Test
    public void addProducts() {
        ProductEntity product = new ProductEntity();

        product.setId(8);
        product.setProductName("Samsung TX");
        product.setProductDesc("Wireless charger");
        product.setProductPrice(150.00);
        product.setSKU("N/A");
        product.setQuantity(17);
        product.setRating(3.4);
        product.setDiscountedPrice(110.00);
        product.setReview("No review for this product yet");


        setup.save(product);
    }

}