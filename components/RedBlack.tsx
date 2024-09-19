"use client"

export default function RedBlack({
    on
}:{
    on: boolean
}) {

    const RED = <h1>RED</h1>
    const BLACK = <h1>BLACK</h1>

    return (
        <div>
            <h1 className="text-center desc">
                RedBlack is currently
            </h1>
            <p className="text-center font-bold text-red-600">
                {on ? RED : BLACK}
            </p>
        </div>
    )
}