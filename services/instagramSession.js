const supabase =
    require("./supabase");

export async function connectInstagram(
    username: string,
    sessionCookie: string
) {

    try {

        console.log(
            "Calling:",
            `${API_URL}/instagram/connect`
        );

        const response =
            await fetch(
                `${API_URL}/instagram/connect`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        session_cookie:
                            sessionCookie,
                    }),
                }
            );

        console.log(
            "Status:",
            response.status
        );

        const data =
            await response.json();

        console.log(
            "Response:",
            data
        );

        return data;

    } catch (err) {

        console.log(
            "FETCH ERROR:",
            err
        );

        throw err;

    }

}

async function verifySession(
    username
) {

    try {

        const {
            data,
            error,
        } = await supabase
            .from(
                "instagram_accounts"
            )
            .select(
                "session_connected"
            )
            .eq(
                "instagram_username",
                username
            )
            .single();

        if (
            error ||
            !data
        ) {

            return {
                valid: false,
            };

        }

        return {
            valid:
                data.session_connected ===
                true,
        };

    } catch (err) {

        return {
            valid: false,
        };

    }

}

module.exports = {
    connectInstagram,
    verifySession,
};