export default function Footer(){

    const currentYear = new Date().getFullYear()   
    return(
        <div className=" mt-20 w-full text-center py-8 h-[50px]">
            <p className="text-sm">
                &copy; {currentYear}
            </p>
        </div>
    )
}