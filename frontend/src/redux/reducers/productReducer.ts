import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const fetchIssues = createAsyncThunk<string[], void, { rejectValue: string }>(
  "githubIssue/fetchIssues",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://api.github.com/repos/github/hub/issues");
      const data = await response.json();
      const issues = data.map((issue: { title: string }) => issue.title);
      return issues;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch issues.");
    }
  }
);




interface IssuesState {
  issues: string[];
  loading: boolean;
  error: string | null;
}
const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: null,
};
export const issuesSliceGithub = createSlice({
  name: 'github_issues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
export default issuesSliceGithub.reducer;
