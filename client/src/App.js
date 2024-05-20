import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import Explore from "./Components/Explore/Explore";
import CreateBlog from "./Components/Blog/CreateBlog";
import BlogHome from "./Components/Blog/BlogHome";
import BlogSingle from "./Components/Blog/BlogSinglePost";
import RecipeItem from "./Components/Recipe/RecipeItem";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UpdateUserDetails from "./Components/UpdateUserDetails";
import ViewUserDetails from "./Components/ViewUserDetails";
import CreateRecipe from "./Components/Recipe/CreateRecipe";
import InventoryMain from "./Components/Inventory/InventoryMain";
import Tracker from "./Components/Meals/Tracker";
import GroceryList from "./Components/Grocery/GroceryList";
import FavRecipe from "./Components/Recipe/FavRecipe";
import Landing from "./Components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/blog" element={<CreateBlog />} />
          <Route path="/bloghome" element={<BlogHome />} />
          <Route path="/blogsingle/:id" element={<BlogSingle />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/inventory" element={<InventoryMain />} />
          <Route path="/recipe/:id" element={<RecipeItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/grocery" element={<GroceryList />} />
          <Route path="/recipe/fav" element={<FavRecipe />} />
          <Route path="/updateuserdetails" element={<UpdateUserDetails />} />
          <Route path="/viewuserdetails" element={<ViewUserDetails />} />

          <Route path="/tracking" element={<Tracker />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
