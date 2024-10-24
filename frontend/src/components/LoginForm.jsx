/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import logo from '../assets/Star_Wars_Logo.svg.png';

export const LoginForm = (props) => {
  const { cookies, setUserLoginCookies } = props;
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: null,
    password: null,
  });
  const showErrorToast = (message) => toast.error(message);
  const showSuccessToast = (message) => toast.success(message);

  if (cookies.user) {
    navigate('/profile');
  }
  console.log(cookies.user);

  const simplifyUserData = (data) => {
    data.favourites.characters = data.favourites.characters.map((char) => {
      return { _id: char._id };
    });
    data.favourites.films = data.favourites.films.map((char) => {
      return { _id: char._id };
    });
    data.favourites.spaceships = data.favourites.spaceships.map((char) => {
      return { _id: char._id };
    });
    data.favourites.vehicles = data.favourites.vehicles.map((char) => {
      return { _id: char._id };
    });
    data.favourites.planets = data.favourites.planets.map((char) => {
      return { _id: char._id };
    });
    return data;
  };

  const handleLogin = async () => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    return data;
  };

  return (
    <>
      <img src={logo} className='relative w-48 m-auto top-20 right-2' />
      <div className='relative flex justify-center top-24'>
        <div className='relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 text-black'>
          <form className='space-y-6' action='#'>
            <h5 className='text-xl font-medium text-gray-900'>
              Sign in to continue your adventure!
            </h5>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900'>
                Your email
              </label>
              <input
                onChange={(event) => {
                  setUserDetails({ ...userDetails, email: event.target.value });
                }}
                type='email'
                className='bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 text-white'
                placeholder='name@company.com'
                required
              />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 '>
                Your password
              </label>
              <input
                onChange={(event) => {
                  setUserDetails({
                    ...userDetails,
                    password: event.target.value,
                  });
                }}
                type='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 '
                required
              />
            </div>
            <button
              onClick={async (event) => {
                event.preventDefault();

                if (
                  userDetails.password.match(/([a-z?'!0-9])/gi).join('') ===
                  userDetails.password
                ) {
                  const data = await handleLogin();
                  if (data.message) {
                    showErrorToast(data.message);
                  } else {
                    const simplifiedData = simplifyUserData(data);
                    setUserLoginCookies(simplifiedData);
                    navigate('/profile');
                    showSuccessToast('Successfully signed in!');
                  }
                } else {
                  showErrorToast('That email or password is invalid');
                }
              }}
              type='submit'
              className='w-full text-black bg-[#ffe81f] hover:bg-[#ffe91fdf] focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Login to your account
            </button>
          </form>

          <div className='text-sm font-medium mt-2 text-gray-500 '>
            Not registered?{' '}
            <Link
              className='text-blue-700 hover:underline dark:text-blue-500'
              to='/signup'
            >
              create one!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
