import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { after, describe } from 'node:test';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);


    // 이곳에 movie 객체를 만들어서 사용할수도 있다. 

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * MovieService의 getAll()을 실행해서
   * 해당 결과값(result)의 타입이 Array인지 테스트
   */
  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      // 테스트 데이터 생성
      service.create({
        title: 'Test Movie',
        genres: ['Test1', 'Test G'],
        year: 2005,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        // 에러가 발생하게끔 작성
        service.getOne(999);
      } catch (e) {
        // 유도한 에러가 나오는지 확인
        expect(e).toBeInstanceOf(NotFoundException);
        // 에러 메시지 확인
        // expect(e.message).toEqual("Movie With Id 999 not found.");
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      // 테스트 데이터 생성
      service.create({
        title: 'Test Movie',
        genres: ['Test1', 'Test G'],
        year: 2005,
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterMovies = service.getAll();

      // expect(afterMovies.length).toEqual(allMovies.length -1);
      expect(afterMovies.length).toBeLessThan(allMovies.length);

    });

    it('should return a 404', () => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('create a movie', () => {
      const beforCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['Test1', 'Test G'],
        year: 2005,
      });

      const afterCreate = service.getAll().length;
      console.log(beforCreate, afterCreate)
      expect(afterCreate).toBeGreaterThan(beforCreate);

    });
  });

  describe('update()', () => {
    it('should update a movie', () => {

      service.create({
        title: 'Test Movie',
        genres: ['Test1', 'Test G'],
        year: 2005,
      });

      service.update(1, {
        title: "Update Test"
      });
      const movie = service.getOne(1);

      expect(movie.title).toEqual("Update Test");

    });

    it('should return a 404', () => {
      try{
        service.update(999,{
          title: "Update Test"
        });
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

  });

});
