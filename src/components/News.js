import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
    const [articles,setArticles]=useState([]);
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [totalResults,settotalResults]=useState(0)
    const capitalize = (word) => {
        let low = word.toLowerCase();
        return low.charAt(0).toUpperCase() + low.slice(1);
    }
    
    const updateNews =async ()=>{
        props.setProgress(10);
        const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pageSize=${props.pageSize}`;
        setLoading(true)
        const data = await fetch(api);
        props.setProgress(30);
        const parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(2);
        props.setProgress(100);
    }
    useEffect(()=>{
        document.title = `News4U - ${capitalize(props.category)}`;
        updateNews();
    },[]);
    // async componentDidMount() {
    //     props.setProgress(10);
    //     const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pageSize=${props.pageSize}`;
    //     this.setState({ loading: true });
    //     const data = await fetch(api);
    //     props.setProgress(30);
    //     const parsedData = await data.json();
    //     props.setProgress(70);
    //     this.setState({
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false,
    //         page: 2
    //     });
    //     props.setProgress(100);
    //     // this.updateNews();
    // }
    const fetchMoreData= async ()=>{
        // this.setState({
        //     page: this.state.page + 1
        // });
        const currentPage = page + 1;
        const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page }&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true)
        const data = await fetch(api);
        const parsedData = await data.json();
        // this.setState({
        //     articles: this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     page:currentPage,
        //     loading: false,
        // })
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setPage(currentPage)
        setLoading(false)

    }
    // const handlePrev = async () => {
    //     // const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // const data = await fetch(api);
    //     // const parsedData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     // this.setState({
    //     //     page:this.state.page-1
    //     // })
    //     setPage(page-1)
    //     updateNews()
    // }
    // const handleNext = async () => {

    //     // const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // const data = await fetch(api);
    //     // const parsedData = await data.json();
    //     // this.setState({
    //     //     page: this.state.page + 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     // this.setState({
    //     //     page:this.state.page+1
    //     // })
    //     setPage(page+1)
    //     updateNews()

    // }

        return (
            <>
                <div className="container my-3">
                    <h1  className="text-center" style={{ margin: '40px 0px',marginTop:'90px' }}>News HeadLines from {capitalize(props.category)}</h1>
                    {loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length!==totalResults}
                        loader={<Spinner/>}
                    >
                    <div className="container">
                    <div className="row">
                        {articles.map((element,index) => (
                                <div className="col-md-4" key={index}>
                                    <NewsItem
                                        title={element.title ? element.title : "No Title available"}
                                        description={element.description ? element.description : "No Description available"} 
                                        url={element.urlToImage ? element.urlToImage : "https://media.bleacherreport.com/image/upload/c_fill,g_faces,w_3800,h_2000,q_95/v1702319871/sdx1wjlqkcqz3anqfabp.jpg"} moreurl={element.url} date={element.publishedAt} author={element.author} source={element.source.name}/>
                                </div>
                            ))}

                    </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="d-flex justify-content-between my-4" >
                        <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrev} >&larr; Previous</button>
                        <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} onClick={this.handleNext} >Next &rarr;</button>
                    </div> */}

                </div>

            </>
        )
}
News.defaultProps = {
    country: "in",
    pageSize: "6"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
}
export default News
