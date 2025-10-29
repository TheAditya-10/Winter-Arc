import { ChallengeCard } from "@/components/challenge-card";
import { createClient } from "@/utils/supabase/server"

const Challages = async () => {

    const supabase = await createClient()
    const {data, error} = await supabase.from("challenges").select("title, id")

    if(error) {
        return (
            <h1>Some thing went wrong. Please try again later!!</h1>
        )
    }

    return (
        <div className="grid @xl/main:grid-cols-2 @4xl/main:grid-cols-3 gap-6 px-6 py-6">
            {data.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
        </div>
    );
};

export default Challages;
