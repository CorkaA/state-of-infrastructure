import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
  selectedGroupId: null,
  nodes: [],
  selectedNodeId: null,
  metrics: {
    labels: [],
    cpu: [],
    memory: [],
    disk: [],
  },
  loading: false,
  error: null,
};

const infrastructureSlice = createSlice({
  name: 'infrastructure',
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload || [];
    },
    selectGroup: (state, action) => {
      state.selectedGroupId = action.payload;
      state.nodes = [];
      state.selectedNodeId = null;
    },
    setNodes: (state, action) => {
      state.nodes = action.payload || [];
    },
    selectNode: (state, action) => {
      state.selectedNodeId = action.payload;
    },
    setMetrics: (state, action) => {
      state.metrics = action.payload || initialState.metrics;
    },
    setNodeDetails: (state, action) => {
      state.interfaces = action.payload?.interfaces || [];
      state.admin = action.payload?.admin || null;
      state.apps = action.payload?.apps || [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setGroups,
  selectGroup,
  setNodes,
  selectNode,
  setMetrics,
  setLoading,
  setError,
} = infrastructureSlice.actions;

export const infrastructureReducer = infrastructureSlice.reducer;