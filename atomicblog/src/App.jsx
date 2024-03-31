import React, { useEffect } from "react";
import { useStateValue } from "./AppContext";
import { faker } from "@faker-js/faker";
import { actionTypes } from "./AppReducer";

function createRandomPost(){
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };

};

// Define the App component
function App() {  
    // Get the isFakeDark state and dispatch function from the context
    const [{ isFakeDark}, dispatch] = useStateValue(); 
    // This line uses the useStateValue hook to get the isFakeDark state and the dispatch function from the context.
    // The useStateValue hook returns an array with the current state and a dispatch function that can be used to update the state.

    const [posts, setPosts] = React.useState(() => 
       Array.from({length: 30}, () => createRandomPost())
       // This line initializes the posts state using the useState hook, setting it to an array of 30 randomly generated posts.       
    );

    const [searchQurey, setSearchQurey] = React.useState('');
    // This line initializes the searchQuery state using the useState hook, setting it to an empty string.

    const searchedPosts = 
        searchQurey.length > 0
        ? posts.filter((post) =>
            `${post.title} ${post.body}`
                .toLowerCase()
                .includes(searchQurey.toLowerCase())
                )
                : posts;
                // This line calculates the searchedPosts based on whether searchQuery has a length greater than 0. If it does, it filters the posts array to include only those whose title or body includes the searchQuery. Otherwise, it returns all posts.

    // function to handle adding a new post 
    function handleAddPost(post){
        setPosts((posts) => [post, ...posts]);     
        // This function handleAddPost adds a new post to the posts state array.
    }

    // This function handleClearPosts clears all posts by setting the posts state array to an empty array.
    function handleClearPosts(){
        setPosts([]);
    }

    // effect to toggle fake Dark Mode class on documnet element 
    useEffect(() => {
        document.documentElement.classList.toggle("fake-dark-mode", isFakeDark)
    }, [isFakeDark]);
    // This useEffect hook toggles the "fake-dark-mode" class on the documentElement based on the isFakeDark state.



    // This function toggleFakeDarkMode dispatches an action to toggle the isFakeDark state.
    const toggleFakeDarkMode = () => {
        dispatch({
            type: actionTypes.TOGGLE_FAKE_DARK_MODE,
        });
    };

    return (
        <section>
            <button onClick={toggleFakeDarkMode}
            className="btn-fake-dark-mode"            
            >{isFakeDark ? "☀️" : "🌙"}
            </button>

            <Header 
            posts={searchedPosts}
            onClearPosts={handleClearPosts}
            searchQurey={searchQurey}
            setSearchQurey={setSearchQurey}
            />

            <Main posts={searchedPosts} onAddPost={handleAddPost}/>
            <Archive onAddPost={handleAddPost} />
            <Footer />
        </section>        
    );  
}

function Header({posts, onClearPosts, searchQurey, setSearchQurey}){
    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
        <div>
            <Results posts={posts}/>
            <SearchPosts searchQurey={searchQurey}
            setSearchQurey={setSearchQurey}
            />
            <button onClick={onClearPosts}>Clear posts</button>
        </div>
        </header>
        );
    }

    function SearchPosts({ searchQurey, setSearchQurey}){
        return(
            <input 
            value={searchQurey}
            onChange={(e) => setSearchQurey(e.target.value)}
            placeholder="Search posts"
            />
        );
    }

    function Results({posts}){
        return(
            <p>Results: {posts.length} Atomic posts found</p>
        );
    }

    function Main({posts, onAddPost}){
        return (
            <main>
                <FormAddPost onAddPost={onAddPost}/>
                <Posts posts={posts}/>  
            </main>    
        )
    }

    function Posts({posts}){
        return (
            <section>
                <List posts={posts}/>
            </section>        
        )
    }

    function FormAddPost({ onAddPost }){
        const [title, setTitle] = React.useState('');
        const [body, setBody] = React.useState('');

        const handleSubmit = function (e) {
            e.preventDefault();
            if(!body || !title) return;
            onAddPost({ title, body }); 
            setTitle('');
            setBody('');
        };

        return (
            <form onSubmit={handleSubmit}>
                <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                />

                <textarea 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Post body"
                />
                <button>add post</button>
            </form>
        )
    }

    
    function List({ posts }){
        return(
            <ul>
                {posts.map((post, i) => {
                    <li key={i}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                })}
            </ul>
        );
    }

    function Archive({ onAddPost }) {
        const [ posts ] = React.useState(() => {
            Array.from({ length: 10000 }, () => createRandomPost())
        })

        const [ showArchive, setShowArchive ] = React.useState(false);

        return(
            <aside>
                <h2>Post Archive</h2>
                <button onClick={() => setShowArchive((s) => !s)}>
                  { showArchive ? "Hide Archive posts" : "show Archive post"}    
                </button>

                {showArchive && (
                    <ul>
                        {posts.map((post, i) => {
                            <li key={i}>
                                <p>
                                    <strong>{post.title}:</strong> {post.body}
                                </p>
                                <button onClick={() => onAddPost(post)}>add new post</button>

                            </li>
                        })}
                    </ul>
                )}




            </aside>            
        )


    }




    function Footer(){
        return 
        <footer>$copy: by samad</footer>
    }


    export default App;