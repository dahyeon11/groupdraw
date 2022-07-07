import { Injectable } from '@nestjs/common';
import { CreateV1Dto } from './dto/create-v1.dto';
import { UpdateV1Dto } from './dto/update-v1.dto';
import * as crypto from 'node:crypto'
import * as dummy from 'data/dummy';
import { newGroupDto } from './dto/newgroup.dto';
import { weightedSample } from 'util/weightedSample';
import { generateWeightArr } from 'util/generateWeightArr';

@Injectable()
export class V1Service {
  create(createV1Dto: CreateV1Dto) {
    return 'This action adds a new v1';
  }

  findAll() {
    return `This action returns all v1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} v1`;
  }

  update(id: number, updateV1Dto: UpdateV1Dto) {
    return `This action updates a #${id} v1`;
  }

  remove(id: number) {
    return `This action removes a #${id} v1`;
  }

  async generateNewGroup (newGroupDto: newGroupDto): Promise<string[][]> {
    let crew = dummy.crew.slice(0) //직원 배열 복제
    let numberOfCrew = crew.length //직원 수
    let group: Array<string>[] = []
    const numberOfGroup = Math.floor(numberOfCrew/newGroupDto.limit) + 1 //총 그룹 수
    const numberOfSmallGroup = (numberOfGroup - (numberOfCrew % newGroupDto.limit)) //한명이 부족한 그룹 수

    const rawWightArr = [2, 2, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1] //raw 가중치 배열(상대적)
    

    for(let groupIndex=1; groupIndex<=numberOfGroup; groupIndex++){
      let newGroup: string[] = []
      
      //팀장 뽑기
      let randomCrewIdx = await crypto.randomInt(numberOfCrew)
      newGroup.push(crew[randomCrewIdx])

      //선발된 사람은 후보그룹에서 제외
      crew.splice(randomCrewIdx, 1)
      rawWightArr.splice(randomCrewIdx, 1)
      numberOfCrew = numberOfCrew - 1

      //팀원 뽑기
      for(let newMemberIndex=1; newMemberIndex<numberOfGroup; newMemberIndex++){
        
        //직원 수와 그룹 단위를 계산해 한명이 부족한 팀 구성
        if(newMemberIndex === (newGroupDto.limit - 1) && groupIndex >= numberOfSmallGroup) {
          newGroup.push('X')
          continue
        }

        let weightArr = generateWeightArr(rawWightArr) //확률로 계산된 가중치 배열
        let newMember = weightedSample(crew, weightArr) //가중치를 적용하여 팀원 샘플
        //console.log(newMember)
        newGroup.push(newMember) //팀원 추가
        const crewIdx = crew.indexOf(newMember) //팀원 ID

        //선발된 사람은 후보그룹에서 제외
        crew.splice(crewIdx, 1)
        rawWightArr.splice(crewIdx, 1)
        numberOfCrew = numberOfCrew - 1
      }

      group.push(newGroup)

    }
    
    return group
  }
  
}
