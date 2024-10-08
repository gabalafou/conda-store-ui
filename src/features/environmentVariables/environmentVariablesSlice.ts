import { createSlice } from "@reduxjs/toolkit";
import { environmentDetailsApiSlice } from "../environmentDetails";

export interface IEnvironmentVariablesState {
  environmentVariables: Record<string, string>;
}

const initialState: IEnvironmentVariablesState = { environmentVariables: {} };

export const environmentVariablesSlice = createSlice({
  name: "environmentVariables",
  initialState,
  reducers: {
    updateEnvironmentVariables: (state, action) => {
      const environmentVariables = action.payload;
      state.environmentVariables = environmentVariables;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      environmentDetailsApiSlice.endpoints.getBuild.matchFulfilled,
      (
        state,
        {
          payload: {
            data: {
              specification: { spec }
            }
          }
        }
      ) => {
        // variables can be undefined if a lockfile specification is provided
        // TODO: parse the lockfile and populate the variables
        const environmentVariables = spec?.variables ?? [];

        state.environmentVariables = environmentVariables;
      }
    );
  }
});

export const { updateEnvironmentVariables } = environmentVariablesSlice.actions;
