import { fetchProductCatalog, fetchProductReviews, fetchSalesReport, NetworkError, DataError } from './apiSimulator';

const loadDashboard = () => {
    fetchProductCatalog()
        .then(products => {
            console.log("Products:", products);

            
            return Promise.all(
                products.map(product =>
                    fetchProductReviews(product.id)
                        .then(reviews => {
                            console.log(`Reviews for ${product.name}:`, reviews);
                        })
                        .catch(err => {
                            console.error(err.message);
                        })
                )
            );
        })
        .then(() => fetchSalesReport())
        .then(report => {
            console.log("Sales Report:", report);
        })
        .catch(err => {
            console.error("Error in dashboard:", err.message);
        })
        .finally(() => {
            console.log("All API calls attempted.");
        });
};

loadDashboard();
