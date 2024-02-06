import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Articles from "../components/Articles";
import ArticleMenu from "../components/ArticleMenu";

export async function loader() {
    const response = await fetch('http://localhost:3000/api/articles');
    const r = await response.json();
    console.log(r)
    return r;

}

export default function HomePage() {
    const { data } = useLoaderData();

    const [articles, setArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (selectedCategory === "All") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter((item) => 
                item.categories.some((category) => category.name === selectedCategory)
            ));
        }
    }, [selectedCategory, data]);
    
    console.log(filteredData)


    return ( 
        <>
            <div className="container">
                <ArticleMenu setSelectedCategory={setSelectedCategory} />
                <div className="suggestions">
                    <div className="suggestionsHeader">
                        <div className="headerLeftSide">
                            <div className="suggest">
                                <img src="/images/vector.svg" alt="Vector Icon" />
                                <h3>{`${data.length} Suggestions`}</h3>
                            </div>
                            <div className="sortBy">
                                <p>Sort By :</p>
                                <select name="" id="">
                                    <option value="">Most Upvotes</option>
                                    <option value="">Least Upvotes</option>
                                    <option value="">Most Comments</option>
                                    <option value="">Least Comments</option>
                                </select>
                            </div>
                        </div>
                        {/* {isAdmin && <button>+ Add Feedback</button>} */}
                    </div>
                    {filteredData && (
                        <Articles filteredData={filteredData} /> 
                    )}
                        
                    {/* {!loading && filteredData.length === 0 && (
                        <div className="suggestionsEmptyList">
                            <img src="/images/empty-icon.png" alt="Empty Icon" />
                            <h3>There is no feedback yet.</h3>
                            <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
                            <button>+ Add Feedback</button>
                        </div>
                    )} */}
                </div>
            </div>
        </>
    )
}