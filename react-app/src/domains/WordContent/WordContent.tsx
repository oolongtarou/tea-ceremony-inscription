import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import WordTitle from '../WordCard/WordTitle';
import WordTags from '../WordCard/WordTags';

import { WordDescriptionEntity, WordInfoDetail } from './WordInfoDetail';
import WordDescription from './WordDescription';
import MonthChips from './MonthChips';
import { Month } from '../../Months';
import React from 'react';
import axios from 'axios';
import { toWordDetail } from '../Converter/Converter';

function WordContent() {
    const descriptions: WordDescriptionEntity[] = [
        { wordId:1, descriptionId:1, description:"屋外で照明用に燃やす火。照明としてもっとも原初的なものは庭火（焚(た)き火）であり、それから進んで、椀(わん)または籠(かご)状（多くは鉄製）のものに薪(たきぎ)（多くは松）を入れて燃やすようになったのが篝火である。夜中の警護・照明または漁猟の際に用いられ、古代以来広く行われたが、現代では薪能(たきぎのう)や鵜飼(うかい)に用いられるのが印象に残りやすい。『源氏物語』第27帖(じょう)を「篝火」と題しているのは、ほのかな篝火の火影に見える女性の姿を情趣深くとらえるところからきたものである。", sourceId:1, sourceName:"小学館　日本大百科全書(ニッポニカ)"},
        { wordId:2, descriptionId:1, description:"古来の照明具の一つ。主として屋外用のもので，手に持って移動するときは松明 (たいまつ) を使い，固定するときは篝火を使う。松の木などの脂 (あぶら) の多い部分を割り木にして，鉄製の篝籠に入れ，火をつけるもので，「かがり」の名も細長い鉄片を編んだ容器からの命名といわれる。軍陣や祭礼など，野外に多数の人の集るときに使うほか，漁船に取付けて集魚灯の役目も果した。有名な長良川の鵜飼舟にも，篝火を取付けており，古風を重んじる祭礼の夜間行事には，今日でも使われることがある。", sourceId:2, sourceName:"ブリタニカ国際大百科事典 小項目事典"}
    ]
    
    const wordDetailtmp: WordInfoDetail = new WordInfoDetail(1, "篝火", "かがりび", descriptions, [new Month(1,0)], ["和歌", "伝統"]);
    const tag = wordDetailtmp.tags.join(", ")


    const [wordDetail, setWordDetail] = React.useState<WordInfoDetail>(new WordInfoDetail(0,"","",[],[],[]));
      React.useEffect(() => {
        const endpoint = `${import.meta.env.VITE_DOMAIN}/word-detail?word-id=3`;
        console.log(`endpoint:${endpoint}`)
        axios.get(endpoint).then((response) => {
          try{
            console.log(response.data.data)
            const testDescription = response.data.data.descriptions[0].description;
            // console.log(`タブ：${testDescription.includes("\t")}`)
            // console.log(`改行¥n：${testDescription.includes("\n")}`)
            // console.log(`改行¥r：${testDescription.includes("\r")}`)
            // console.log(`改行¥r¥n：${testDescription.includes("\r\n")}`)

            const converted = toWordDetail(response.data.data)
            console.log(converted)
            setWordDetail(converted)
          } catch(error){
            console.error(`error:${error}`)
          }
        })    
      }, []);

    return(
        <Container maxWidth='lg'>  
            <WordTitle title={wordDetail.title} pronunciation={wordDetail.pronunciation} mainFontSize='50px' subFontSize='27.5px' />
            <MonthChips {...wordDetail}/>
            <div style={{marginTop:'30px'}}/>
            <WordTags tag={tag} inputFontSize='20px' inputImgSize={25} />
            <Divider style={{marginBottom:'50px'}} />
            {wordDetail.descriptions.map((description , index) => (
                <WordDescription key={index} {...description} />
            ))}
        </Container>
    )
}


export default WordContent