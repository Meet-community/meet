import { useContext } from 'react';
import { CreateEventContext } from './CreateEventContext';

export const useCreateEventContext = () => useContext(CreateEventContext);
