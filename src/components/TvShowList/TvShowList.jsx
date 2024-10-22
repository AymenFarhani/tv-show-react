import { TvShowListItem } from "../TvShowListItem/TvShowListItem";
import s from "./style.module.css";

export function TvShowList({tvShowList}) {
    return <>
    <div className={s.title}>You may also like: 
        <div className={s.list}>
            {tvShowList.map((tvShow) => {
                return <span  key={tvShow.id} className={s.tv_show_list_item}>
                    <TvShowListItem tvShow={tvShow} onClick={() => ''}/>
                    </span> 
            })}
        </div>
    </div>
    </>
}