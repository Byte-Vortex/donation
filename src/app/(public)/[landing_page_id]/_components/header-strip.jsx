export function HeaderStrip({ data }) {

    return (
        <> {
            data?.header_stripe_text ? (
                <div className="bg-landing-tertiary text-landing-primary text-center py-1 px-2 font-semibold" >
                    <p className="text-sm md:text-base">{data.header_stripe_text}</p>
                </div>
            ) : null
        }</>
    )
}