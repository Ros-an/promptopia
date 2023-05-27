import "@styles/globals.css";

export const metadata = {
    title: "promptopia",
    description: "Discover & Share AI prompts"
}
function Layout({ children }: any) {
    return (
        <html lang="en">
            <div className="main">
                <div className="gradient" />
            </div>
            <main className="app">
                {children}
            </main>
        </html>
    )
}

export default Layout