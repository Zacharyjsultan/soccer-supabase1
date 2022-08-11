const SUPABASE_URL = 'https://ttldeenxxjworwkqykdt.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bGRlZW54eGp3b3J3a3F5a2R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTk2NDc5MTMsImV4cCI6MTk3NTIyMzkxM30.jEFkrL00S4lZ9cr9E2YhS5KP-GPwcdDh89zvFcsM0kg';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


export async function createGame(game) {
    // is this right?
    const response = await client.from('game').insert(game);
    
    return checkError(response);
}

export async function getGames() {
    // ??
    const response = await client.from('game').select();

    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
