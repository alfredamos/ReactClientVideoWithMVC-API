import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { CategoryList } from './Pages/Categories/CategoryList';
import { CreateCategory } from './Pages/Categories/CreateCategory';
import { EditCategory } from './Pages/Categories/EditCategory';
import { DetailCategory } from './Pages/Categories/DetailCategory';
import { DeleteCategory } from './Pages/Categories/DeleteCategory';
import { VideoList } from './Pages/Videos/VideoList';
import { CreateVideo } from './Pages/Videos/CreateVideo';
import { EditVideo } from './Pages/Videos/EditVideo';
import { DetailVideo } from './Pages/Videos/DetailVideo';
import { DeleteVideo } from './Pages/Videos/DeleteVideo';
import { VideoThumbs } from './Pages/Videos/VideoThumbs';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>            
        <Route path='/categoryList' component={CategoryList} />            
        <Route path='/createCategory' component={CreateCategory} />
        <Route path='/editCategory/:id' component={EditCategory} />
        <Route path='/deleteCategory/:id' component={DeleteCategory} />
        <Route path='/detailCategory/:id' component={DetailCategory} />
        <Route exact path='/' component={VideoList} />
        <Route path='/videoThumbs' component={VideoThumbs} />
        <Route path='/createVideo' component={CreateVideo} />
        <Route path='/editVideo/:id' component={EditVideo} />
        <Route path='/deleteVideo/:id' component={DeleteVideo} />
        <Route path='/detailVideo/:id' component={DetailVideo} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
