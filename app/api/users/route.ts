// http://localhost:3000/api/users
export async function GET(request:any) {
    const users = [
        {
            name: "one"
        },
        {
            name: "two"
        }
    ];
    return new Response(JSON.stringify(users))
}