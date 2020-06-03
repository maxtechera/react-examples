import * as React from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      fullname
      age
      email
    }
  }
`;

// const USERS_QUERY = gql`
//   # Write your query or mutation here
//   query Users {
//     users {
//       id
//       fullname
//       age
//       email
//     }
//   }
// `;

const useForm = ({ onSubmit }) => {
  const [state, setState] = React.useState({});
  const handleChange = (key) => (value) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    // const user = await client.login({email, password});
    console.log("REGISTER USER", state);
    return onSubmit(state);
  };

  return {
    state,
    handleChange,
    handleSubmit,
  };
};

const useRegister = () => {
  const [register] = useMutation(REGISTER_MUTATION);
  const { state, handleChange, handleSubmit } = useForm({
    onSubmit: ({ repeatPassword, ...values }) => {
      console.log("REGISTER", values);
      return register({
        variables: {
          input: values,
        },
      }).then((result) => {
        console.log("RESULT", { result });
        return result;
      });
    },
  });
  return {
    state,
    handleChange,
    handleSubmit,
  };
};
export default useRegister;
