import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

 const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    
//  Function to capital the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

// Fetching and updating news
    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&lang=en&token=${props.apiKey}&page=${page}&max=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30)
        let parseData = await data.json();
        props.setProgress(60)
        setArticles(parseData.articles);
        setTotalResults(parseData.totalArticles);
        setLoading(false);

        props.setProgress(100)
    }
    
    useEffect(() => {
        document.title = `${capitalizeFirstLetter( props.country )}-G-News`;
        updateNews();
        //eslint-disable-next-line
    }, [])

    // Function to change page number and get more news
    const fetchMoreData = async () => {
      const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&lang=en&token=${props.apiKey}&page=${page + 1}&max=${props.pageSize}`;
      setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles( articles.concat(parseData.articles))
        setTotalResults(parseData.totalArticles)
      };
    
        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0px", marginTop:"90px" }}>
                    G-News- Top {capitalizeFirstLetter(props.country)}{" "}
                    Headlines{" "}
                </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />} >
                        <div className="container">

                        
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.image}
                                        newsUrl={element.url}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
            </>
        );
  
}

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
};
News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
