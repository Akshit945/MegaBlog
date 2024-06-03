import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import Spinner from '../components/Spinner';
import { logout } from '../store/authSlice';
import { NavLink } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((response) => {
            if (response) {
                setPosts(response.documents);
            }
            setLoading(false); // Set loading to false after fetching posts
        }).catch((error) => {
            console.error("Error fetching posts:", error);
            setLoading(false); // Set loading to false even if fetching fails
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Spinner />
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center h-4/5">
                <Container>
                    <div className="flex flex-wrap ">
                        <div className="p-2 w-full h-4/5">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                            <NavLink to="/login">Login to read posts</NavLink>
                            </h1>
                        </div>
                    </div>
                    <p>Sample id:<br/>EmailId: test@app.com<br />Password:12345678</p>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
