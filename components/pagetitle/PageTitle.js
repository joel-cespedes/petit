import React from 'react'
import Link from "next/link";

const PageTitle = (props) => {
    const sectionStyle = props.backgroundImage
        ? { backgroundImage: `url(${props.backgroundImage})` }
        : {};

    return (
        <section className="page-title" style={sectionStyle}>
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <h2>{props.pageTitle}</h2>
                        <ol className="breadcrumb">
                            <li><Link href="/">Home</Link></li>
                            <li><span>{props.pagesub}</span></li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageTitle;