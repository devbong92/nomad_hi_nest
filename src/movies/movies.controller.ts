import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {


    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(): Movie[]{
        // return "This will return all movies";
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query("year") searchingYear:string){
        return `We are searching for a movie mad after: ${searchingYear}`;
    }

    @Get("/:id")
    getOne(@Param('id') movieId: number) {
        // return `This will return one movie : ${movieId}`;
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        console.log(movieData);
        // return 'This Will create a movie';
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number) {
        // return `This will delete a movie with the id : ${movieId}`;
        return this.moviesService.deleteOne(movieId);
    }

    @Patch("/:id")
    path(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto){
        // return `This will patch a movie with the id : ${movieId}`;
        return this.moviesService.update(movieId, updateData);
    }

}
