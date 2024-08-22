const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-full lg:container flex flex-col min-h-screen">
      {children}
    </div>
  )
}

export default Container