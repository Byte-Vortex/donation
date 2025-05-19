import "./donate-button.css"

export function DonateButton() {
    return (
        <div className="flex gap-4 bg-gradient-to-b from-white/60 to-transparent rounded-xl p-[1px] overflow-hidden max-w-max">
            <a
                href="#form"
                className="font-Normal rounded-xl text-white py-2 relative shadow-sm hover:brightness-110 active:scale-95 duration-150 active:brightness-75 px-6 text-base  shine-animation bg-gradient-to-r from-landing-secondary to-landing-primary">
                Donate Now
            </a>
        </div>
    )
}