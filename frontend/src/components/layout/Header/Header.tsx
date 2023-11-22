import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar,  Divider } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch,} from '../../../redux/store';
// import { getCount} from '../../../redux/reducers/postSlice';
import { logOutUser, resetSingleUserMessage, userTypeInFrontEnd } from '../../../redux/reducers/userSlice22';
import { toast } from 'react-toastify';
import MainLeftDrawer from "./MainLeftDrawer.tsx"
import { fetchProducts22, saveKeyword } from '../../../redux/reducers/productReducer22.ts';
// import SpeedDialOptions from '../../SpeedDialOptions/SpeedDialOptions.tsx';


export const useDebounce = (value:string, milliSeconds:number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
 
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);
 
    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);
 
  return debouncedValue;
 };

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


interface HeaderProps{
  setdarkTheme:React.Dispatch<React.SetStateAction<boolean>>,
  darkThemer:boolean
  loggedInUser:userTypeInFrontEnd | null

}

export default function PrimarySearchAppBar({setdarkTheme, darkThemer, loggedInUser}:HeaderProps) {
  // const count =  useSelector(getCount)
  const dispatch = useDispatch<AppDispatch>()


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [loggnedinUserName, setloggnedinUserName] = React.useState("")

  const [openDrawer, setopenDrawer] = React.useState(false)

  const navigate = useNavigate()
// console.log({loggedInUser})
// console.log({loggnedinUserName})
React.useEffect(() => {
  if(loggedInUser){
    setloggnedinUserName(loggedInUser.name)
  }

}, [loggedInUser?.name, dispatch])



  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

  };

  const handleProfileButtonClikced =()=>{
    setAnchorEl(null);

    if(loggedInUser){
      console.log("lgoutuout dispatch")
      dispatch(logOutUser())
      toast.error("logout as " + loggedInUser.name)
      dispatch(resetSingleUserMessage())
      setloggnedinUserName("")
    }else{
 navigate("/login")
    }
   

  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const onSignUpClicked = (_event: React.MouseEvent<HTMLElement>) => {
    navigate("/signUp")
    // setMobileMoreAnchorEl(event.currentTarget);
    setAnchorEl(null);
    setMobileMoreAnchorEl(null)
  };

  const onAccoutClick = (_event: React.MouseEvent<HTMLElement>) => {
    navigate("/account")
    // setMobileMoreAnchorEl(event.currentTarget);
    setAnchorEl(null);
    setMobileMoreAnchorEl(null)
  };

  


  const [searchInput, setsearchInput] =React.useState("")

  const searchQuery = useDebounce(searchInput, 2000)

const searchChangehandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
  setsearchInput(e.target.value)

  
}



React.useEffect(() => {
if(searchQuery){
  dispatch(saveKeyword(searchQuery))
    dispatch(fetchProducts22({keyword:searchQuery, page:1,ratings:0, category:null,price:[0,99999]}))
navigate("/allProducts")
}else{
  dispatch(saveKeyword(""))
  dispatch(fetchProducts22({keyword:"", page:1,ratings:0, category:null,price:[0,99999]}))
}

  

}, [searchQuery])



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileButtonClikced}>{loggnedinUserName?"Logout":"Login"}</MenuItem>
      <MenuItem onClick={onAccoutClick}> account</MenuItem>
      <MenuItem onClick={onSignUpClicked}> Sign Up</MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {/* <AccountCircle /> */}

          {loggnedinUserName?<Avatar  alt="userpic" src={loggedInUser?.avatar.url}/>:<AccountCircle />}
{/* 
          <Avatar src="https://cdn.statcdn.com/Infographic/images/normal/16516.jpeg" /> */}
      
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{flexGrow:1 }} >
      <AppBar position="static"  >
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            
            onClick={()=>setopenDrawer(!openDrawer)}
          >
            <MenuIcon     />

   
          </IconButton>
      
       

          <Typography
            variant="h6"
            // noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            
            
          <Link to="/">Home</Link>
          </Typography>
         
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchChangehandler}
              value={searchInput}
            />
          </Search>
        
     
           {/* <Box sx={{ flexGrow: 1 }}>
         <Link to="/counter">counter</Link>

          </Box>
          <Divider orientation="vertical" flexItem sx={{background:"white" , margin:"1vw"}} />
          <Box sx={{ flexGrow: 1 }}>
     <Link to="/posts">Posts</Link>

          </Box>  */}
          <Divider orientation="vertical" flexItem sx={{background:"white" , margin:"1vw"}} />


          <Box sx={{ flexGrow: 1 }}>
     <Link to="/cart">Cart</Link>

          </Box> 
          <Divider orientation="vertical" flexItem sx={{background:"white" , margin:"1vw"}} />
          
       
          <Box >
            {/* <Checkbox onClick={()=>setdarkTheme(!darkThemer)}/> */}

            { darkThemer ?   <IconButton onClick={()=>setdarkTheme(!darkThemer)} ><WbSunnyIcon /> </IconButton>  :  <IconButton onClick={()=>setdarkTheme(!darkThemer)}><DarkModeIcon/></IconButton>}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              {loggnedinUserName?<Avatar  alt="userpic" src={loggedInUser?.avatar.url}/>:<AccountCircle />}


            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {openDrawer && <MainLeftDrawer openDrawer={openDrawer} />}


    </Box>

   
  );
}