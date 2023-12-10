// Definición de la interfaz del puerto
interface EventPort {
    createEvent(startDate: Date, endDate: Date): Promise<void>;
    getEvent(id: string): Promise<Event>;
   }
   