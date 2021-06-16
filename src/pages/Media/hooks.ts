import { useEffect, useState } from "react";
import { getMediaList, getPlatFormList, getTagsList } from "../../serve/media";

type IOptions = { key: string; label: string };

export const useGetPlatForm = () => {
  const [platForm, setPlatForm] = useState<IOptions[]>([]);

  const xhr = async () => {
    const result = await getPlatFormList();
    if (result?.data) {
      const formatedResult = result?.data.map(
        (item: { id: any; name: any }) => ({ key: item.id, label: item.name })
      );
      setPlatForm(formatedResult);
    }
  };

  useEffect(() => {
    xhr();
  }, []);

  return platForm;
};

export const useGetTags = ()=>{
    const [tags, setTags] = useState<IOptions[]>([]); 

    const xhr = async ()=>{
        const result = await getTagsList();
        if(result?.data){
            const formatList = result?.data.map((item: { id: any; name: any; })=>({key: item.id, label: item.name}))
            setTags(formatList)
        }
    }

    useEffect(()=>{
        xhr();
    }, [])

    return tags
  }


export const useGetTable = (activeTags: string, activePlatform:string)=>{
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    
    const getTableList = async ()=>{
        setLoading(true);
        const result = await getMediaList({
            platform: activePlatform, 
            tag: activeTags
        })
        setLoading(false);
        console.log('result', result);
        if(result?.data?.data){
            setDataSource(result?.data?.data || [])
        }
    }

    useEffect(()=>{
        getTableList()
    }, [])

    useEffect(()=>{
        getTableList()
    }, [activePlatform, activeTags])

    return [dataSource, loading, getTableList]
}