import React, { useEffect,useState,useReducer} from 'react'

import Pagination from 'reactjs-hooks-pagination';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'

import { fetchPosts } from '../actions/postsActions'

import { Post } from '../components/Post'
import Paginator from 'react-hooks-paginator';

const PostsPage = ({ dispatch, loading, posts, hasErrors }) => {
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const renderPosts = () => {
    
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display posts.</p>

    return posts.map(post => <Post key={post.id} post={post} excerpt />)
  }

  return (
    
    <section>
      
      {renderPosts()}
    </section>
  )
}

const mapStateToProps = state => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors,
})

export default connect(mapStateToProps)(PostsPage)
