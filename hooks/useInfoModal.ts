// zustand is a small, fast and scaleable bearbones state-management solution. It is a simple hook-based state-management solution that is easy to use and understand. It is a great alternative to Redux and MobX. 
import {create} from 'zustand';

// ModalStoreInterface is an interface that defines the shape of the state that we want to manage. It has two properties: movieId and isOpen. movieId is a string that represents the id of the movie that we want to display in the modal. isOpen is a boolean that represents whether the modal is open or not. It also has two methods: openModal and closeModal. openModal is a function that takes a string as an argument and sets the movieId to that string and sets isOpen to true. closeModal is a function that sets isOpen to false and sets movieId to undefined.
export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

// useInfoModal is a hook that creates a store using the create function from zustand. A store is a place where we can store our state. We want to store our state in a store so that we can access it from anywhere in our app. 
// The create function takes a function as an argument.
// Set is a function that is passed to the create function. It is a function that we can use to update the state. We can use it to update the state by passing it an object that represents the new state that we want to set.
// The function returns an object that represents the state that we want to manage. The object has two properties: movieId and isOpen. movieId is a string that represents the id of the movie that we want to display in the modal. isOpen is a boolean that represents whether the modal is open or not. 
// It also has two methods: openModal and closeModal. openModal is a function that takes a string as an argument and sets the movieId to that string and sets isOpen to true. closeModal is a function that sets isOpen to false and sets movieId to undefined.
const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId: string) => set({isOpen: true, movieId}),
    closeModal: () => set({isOpen: false, movieId: undefined})
}));

// Export default syntax is used to export a single class, function, or primitive from a script file so that it can be used by other files to import.
// the default keyword means that the module that is being exported is the primary export of the file as opposed to being one of possibly many named exports.
export default useInfoModal;