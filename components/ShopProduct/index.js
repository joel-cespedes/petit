import React from "react";
import Link from "next/link";


const ShopProduct = ({ products, addToCartProduct }) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <div className="shop-content">
            <div className="shop-grids clearfix">
                {products.length > 0 &&
                    products.slice(0, 12).map((product, pitem) => (
                        <div className="grid" key={pitem}>
                            <div className="img-add-cart">
                                <div className="img-holder">
                                    <img src={product.proImg} alt="" />
                                </div>
                                <div className="add-cart">
                                    <button
                                        data-bs-toggle="tooltip"
                                        data-bs-html="true"
                                        title="Add to Cart"
                                        onClick={() => addToCartProduct(product)}
                                    >
                                        Add to cart <i className="ti-shopping-cart"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="details">
                                <h4><Link onClick={ClickHandler} href={""} as={`/product-single/${product.slug}`}>{product.title}</Link></h4>
                                <span className="price">${product.price}</span>
                                <del>${product.delPrice}</del>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="pagination-wrapper pagination-wrapper-center">
                <ul className="pg-pagination">
                    <li>
                        <Link href="/shop" aria-label="Previous">
                            <i className="ti-arrow-left"></i>
                        </Link>
                    </li>
                    <li className="active"><Link href="/shop">1</Link></li>
                    <li><Link href="/shop">2</Link></li>
                    <li><Link href="/shop">3</Link></li>
                    <li>
                        <Link href="/shop" aria-label="Next">
                            <i className="ti-arrow-right"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ShopProduct;
