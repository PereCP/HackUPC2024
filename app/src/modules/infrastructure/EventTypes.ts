export type Event = {
    id: string;
    title: string;
    description: string;
    category: string;
    startDate: string;
    location: string;
    relevance: number;
};

export function to_event(data: any): Event {
    return {
        id: data.id,
        title: data.Evento,
        description: data.Descripcion,
        category: data.Categoria,
        startDate: data.Fecha,
        location: data.Ubicacion,
        relevance: data.Relevancia,
    };
}
