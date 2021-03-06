# TomaToDo

[TomaToDo Heroku Link][heroku]

[heroku]: https://tomatodo.herokuapp.com/

## Description:

Full-stack web app using React and Rails.  Sign up for an account and log in to make a to-do list.
Follow the pomodoro technique to finish the to-do item.

## Schema
[DB schema][schema]

[schema]: ./docs/schema.md

## Technologies Used

Front-end: React, HTML, CSS, Javascript, AJAX

I used React for the front-end because only small parts of the page are changed at a time
and most of the other elements stay the same. I chose not to use a React framework because
the size of the project is small.

Back-end: Rails, Ruby, Postgresql

Given the limited amount of time I chose rails for the back-end because it is very easy and fast to start a project.

Other Tools: Git

## Tradeoffs/Decisions

- I automatically stop the timer whenever the user switches between TODOs and creates new TODOs. This removes the possibility of multiple timers running at once while also disincentives the user from looking through their TODOs while their timer is running.

- Allows user to pause/resume the timer. A user might have something urgent and can't complete a
25 minute interval.

- Can skip breaks. Cause some people might want to keep working.

## Technical Tradeoffs/Decisions

- I fetch all the to-dos(via ajax) currently associated with the logged in user instead of fetching them when
needed. The initial fetch is a little more costly, but after the initial fetch there are no more fetches.
This is generally better if the user views a high percentage of the to-dos.  This is worse when a user views
a small percentage of to-dos.

- If an ajax request to update a to-do returns with a successful status I update the specific to-do in the
TodoStore with the sent to-do instead of returning the to-do in the response. This saves a little bit of time/memory
because the response won't be as large.

- I created a done attribute on to-dos. I don't think I needed that I could just calculate whether the to-do is done
on the front-end. I was thinking that it would be better to calculate it on the back-end, but it's probably faster
to just update the pomodoros and calculate whether it is done on the front-end than to wait for the ajax response. I
ended up doing the latter and deleting the done attribute from my database.

## Future Improvements
- The code is not as organized and clean as it can be. Using a framework might have helped.
- Unit tests
- Can make mobile viewing better/make design more responsive.
- Multi browser support
