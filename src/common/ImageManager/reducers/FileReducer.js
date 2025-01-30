import React, {
    createContext,
    useReducer,
    useContext,
} from "react";
  
  // Define the initial state
  const initialState = { files: [] };
  
  // Define action types as a plain object (replacing TypeScript enum)
  const FileManagerActionType = {
    ADD_FILES: "ADD_FILES",
    CHECK_FILE: "CHECK_FILE",
    UNCHECK_FILE: "UNCHECK_FILE",
    UPDATE_FILE: "UPDATE_FILE",
    SELECT_ALL: "SELECT_ALL",
    UNSELECT_ALL: "UNSELECT_ALL",
    UPDATE_FILES: "UPDATE_FILES",
  };
  
  // Reducer function
  const fileManagerReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case FileManagerActionType.ADD_FILES:
        console.log('ADD_FILES action called');
        const selectedFileModels = payload.files;
        const existingFiles = state.files.map(file => file.id);
        const newFiles = selectedFileModels.filter(file => !existingFiles.includes(file.id));
        console.log('New files to add:', newFiles);
        return {
          ...state,
          files: [...state.files, ...newFiles],
        };
  
    case FileManagerActionType.CHECK_FILE:
        console.log('CHECK_FILE action called');
        const checkedFiles = state.files.map((file, index) =>
            index === payload.index ? { ...file, isChecked: true } : file
        );
        console.log('Updated files after check:', checkedFiles);
        return {
            ...state,
            files: checkedFiles,
        };
      
    case FileManagerActionType.UNCHECK_FILE:
        console.log('UNCHECK_FILE action called');
        const uncheckedFiles = state.files.map((file, index) =>
            index === payload.index ? { ...file, isChecked: false } : file
        );
        console.log('Updated files after uncheck:', uncheckedFiles);
        return {
            ...state,
            files: uncheckedFiles,
        };
      
    case FileManagerActionType.UPDATE_FILE:
        console.log('UPDATE_FILE action called');
        const updatedFileList = state.files.map((file, index) =>
            index === payload.index ? payload.files[0] : file
        );
        console.log('Updated files after update:', updatedFileList);
        return {
            ...state,
            files: updatedFileList,
        };
      
      case FileManagerActionType.UPDATE_FILES:
        console.log('UPDATE_FILES action called');
        const updatedFiles = state.files.filter(
          (file) => !payload.files.some((f) => f.id === file.id)
        );
        console.log('Files after update:', updatedFiles);
        return {
          ...state,
          files: updatedFiles,
        };
  
    case FileManagerActionType.SELECT_ALL:
        console.log('SELECT_ALL action called');
        const allSelectedFiles = state.files.map((file) => ({ ...file, isChecked: true }));
        console.log('Files after select all:', allSelectedFiles);
        return {
            ...state,
            files: allSelectedFiles,
        };
      
      case FileManagerActionType.UNSELECT_ALL:
        console.log('UNSELECT_ALL action called');
        const allUnselectedFiles = state.files.map((file) => ({ ...file, isChecked: false }));
        console.log('Files after unselect all:', allUnselectedFiles);
        return {
          ...state,
          files: allUnselectedFiles,
        };
  
      default:
        return state;
    }
  };
  
  // Create context
  const FileManagerContext = createContext(undefined);
  
  // Provider component
  const FileManagerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(fileManagerReducer, initialState);
  
    return (
      <FileManagerContext.Provider value={{ state, dispatch }}>
        {children}
      </FileManagerContext.Provider>
    );
  };
  
  // Custom hook to use the context
  const useFileManager = () => {
    const context = useContext(FileManagerContext);
    if (!context) {
      throw new Error("useFileManager must be used within a FileManagerProvider");
    }
    return context;
  };
  
  export { FileManagerProvider, useFileManager, FileManagerActionType };
  