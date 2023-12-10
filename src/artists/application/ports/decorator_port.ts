class EventAdapter implements EventPort {
   
    async createEvent(startDate: Date, endDate: Date): Promise<void> {
      // Lógica para crear un evento
      const event = new Event(startDate, endDate);
      await this.getEvent;
    }
   
    async getEvent(id: string): Promise<Event> {
      // Lógica para obtener un evento
      return this.eventRepository.findById(id);
    }
   }
   