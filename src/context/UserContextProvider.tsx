import {
  createContext,
  useReducer,
  ReactElement,
  SetStateAction,
  Dispatch,
  useEffect,
  ReducerAction,
} from "react";
import { useNavigate } from "react-router-dom";

interface initState {
  user: IUser | null;
}

const init = (initialUser: IUser | null) => {
  return { user: initialUser };
};

const initialState: initState = {
  user: null,
};

export interface Props {
  children: ReactElement;
}

interface IUser {
  message: string;
  email: string;
  username: string;
  token: string;
}

interface UserAction {
  type: string;
  payload: IUser;
}

const UserReducer = (state: typeof initialState, action: UserAction) => {
  switch (action.type) {
    case "SIGNUP":
      return { ...state, user: action.payload };

    case "LOGIN":
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null };

    default:
      return state;
  }
};

export const UserContext = createContext(null);

const UserContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    dispatch({ type: "LOGIN", payload: user });
    // navigate('/')
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
