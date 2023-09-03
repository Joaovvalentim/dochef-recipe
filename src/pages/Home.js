import Vegans from "../components/Vegans";
import Trending from "../components/Trending";
import { motion } from "framer-motion"


function Home() {
    return (
            <motion.div
            animate={{ opacity: 1}}
            initial={{ opacity: 0}}
            exit={{opacity: 0}}
            transition={{
              duration: 0.8,
            }}
                >
                <Trending />
                <Vegans />
            </motion.div>
    )
}

export default Home