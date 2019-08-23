/* eslint-disable no-case-declarations */
import { AsyncStorage } from "react-native";
import { ngrokKey } from "../../secrets";
import  axios  from "axios";

const SUBMITTED_FPNODES = "SUBMITTED_FPNODES";
const UNDO_FPNODE = "UNDO_NODE";
const ADD_FPNODE = "ADD_FPNODE";
const EDIT_FPNODE = "EDIT_FPNODE";

const initialState = {
  fPNodes: [{x:0, y:0, z: -1, key:0}]
};

export const editFPNode = node => {
  return {
    type: EDIT_FPNODE,
    node
  };
};

export const submitFPNodes = nodes => {
  return {
    type: SUBMITTED_FPNODES,
    nodes
  };
};

export const undoFPNode = () => {
  return {
    type: UNDO_FPNODE
  };
};

export const addFPNode = () => {
  return {
    type: ADD_FPNODE
  };
};

export const submitFPNodesThunk = () => {
  return async dispatch => {
    try {
      const newNodes = initialState.fPNodes.map(node => {
        return { x: node.x, y: node.z };
      });
      const { data } = await axios.post(`${ngrokKey}/api/floorplans`, {
        coordinates: newNodes,
        userId: 1
      });
      dispatch(submitFPNodes(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const floorPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FPNODE:
      if (state.fPNodes.length) {
        const mostRecentNode = state.fPNodes[state.fPNodes.length - 1];
        return {
          ...state,
          fPNodes: [
            ...this.state.fPNodes,
            {
              x: mostRecentNode.x + 0.1,
              y: mostRecentNode.y,
              z: mostRecentNode.z,
              key: mostRecentNode.key + 1
            }
          ]
        };
      } else {
        return {
          ...state,
          fPNodes: [
            {
              x: 0,
              y: 0,
              z: 0,
              key: 0
            }
          ]
        };
      }
    case UNDO_FPNODE:
      const newArr = state.fPNodes;
      newArr.pop();
      return { ...state, fPNodes: newArr };
    case SUBMITTED_FPNODES:
      return { ...state, fPNodes: { x: 0, y: 0, z: -1, key: 0 } };
    case EDIT_FPNODE:
      const newerArr = state.fPNodes;
      let current = newerArr.map(node => {
        if (node.key === action.node.key) {
          node = {
            x: action.node.x,
            y: action.node.y,
            z: action.node.z,
            key: action.node.key
          };
        }
        return node;
      });
      return { ...state, fPNodes: current };
    default:
      return state;
  }
};
