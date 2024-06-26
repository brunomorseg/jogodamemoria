'use client'

import Image from 'next/image';
import * as C from './App.styles';
import logoImagem from '../svgs/b7.svg';
import { InfoItem } from '@/components/InfoItem/InfoItem';
import { Button } from '@/components/Button/Button';
import RestartIcon from '../svgs/restart.svg'
import { useEffect, useState } from 'react';
import { GridItemType } from '@/types/GridItemType';
import { items } from '@/data/items';
import { GridItem } from '@/components/GridItem';
import { formatTimeElapsed } from '@/helpers/formatTimeElapsed';

const Page =()=> {
  const [playing,setPlaying] = useState<boolean>(false)
  const [timeElapsed,setTimeElapsed]= useState<number>(0)
  const [moveCount,setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItems,setGridItems] = useState<GridItemType[]>([])

  useEffect(()=>resetAndCreateGrid(),[])

  useEffect(()=>
    {
      const timer = setInterval(()=>{
        if(playing) setTimeElapsed(timeElapsed+1)
      }, 1000)
      return () => clearInterval(timer)
    }
    
    ,[playing,timeElapsed])

    //verify if opened are equal

  useEffect(()=>{
    if(showCount===2) {
      let opened = gridItems.filter(item=>item.show===true)
      if(opened.length === 2) {
        //v1 - If both are equal, make every show permanent
        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems]
          for(let i in tmpGrid){
            if(tmpGrid[i].show) {
              tmpGrid[i].permanentShow=true
              tmpGrid[i].show=false
            }
          }
          setGridItems(tmpGrid)
          setShowCount(0)
        } else { 
          setTimeout(()=>{
            let tmpGrid = [...gridItems]
          for(let i in tmpGrid) {
            tmpGrid[i].show =false
          }
          setGridItems(tmpGrid)
          setShowCount(0)
          },1000)
        }
        setMoveCount(moveCount=>moveCount+1)
      } 
    }
  },[showCount,gridItems])

  useEffect(()=>{
    if(moveCount>0 && gridItems.every(item=>item.permanentShow===true)){
      setPlaying(false)
    }
  },[moveCount,gridItems])


  const resetAndCreateGrid =()=>{
   //Passo 1 - resetar o jogo
    setTimeElapsed(0)
    setMoveCount(0)
    setShowCount(0)

    //Passo 2 - criar a grid
    //2.1-criar um grid vazio

    let tmpGrid:GridItemType[]=[]

    for(let i = 0; i<12; i++) {
      tmpGrid.push({
        item:null,
        show:false,
        permanentShow:false
      })
    }
    //Passo 2.2 - preencher o grid
    for(let w=0; w<2; w++) {
      for(let i=0; i<items.length;i++) {
        let pos = -1;
        while(pos<0 || tmpGrid[pos].item !==null){
          pos = Math.floor(Math.random() * (items.length*2))
        }
        
        tmpGrid[pos].item=i
      }
    }


    //Passo 2.3 - Jogar na State
    setGridItems(tmpGrid)


    //Passo 3 - Começar o jogo
    setPlaying(true)
  }

  const handleItemClick = (index:number)=>{
    if(playing && index !== null && showCount <2) {
      let tmpGrid = [...gridItems]
      if(tmpGrid[index].permanentShow === false && tmpGrid[index].show ===false) {
        tmpGrid[index].show=true
        setShowCount(showCount +1)
      }
      setGridItems(tmpGrid)
    }
  }

  return (
   <div className='bg-white'>
  
    <C.Container>

      <C.Info>
          <C.LogoLink href=''>
            <Image src={logoImagem} width={100} alt='LogoTipo'/>
         </C.LogoLink>

          <C.InfoArea>
            <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
            <InfoItem label='Movimentos' value={moveCount.toString()} />
          </C.InfoArea>

        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>

      </C.Info>
      <C.GridArea>
          <C.Grid>
             {gridItems.map((item,index)=>(
              <GridItem
                key={index}
                item={item}
                onClick={()=>handleItemClick(index)}
              />
             ))} 
          </C.Grid>
      </C.GridArea>

    </C.Container>
    
    </div>
  );
}

export default Page;