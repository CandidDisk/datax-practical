# Extra questions
## Question 1
#### Brief analysis on the pros and cons of the design and implementation
```
Pros
- TaskService is asynchronous in nature, more performant than blocking 
- Implementation of Redis allows for in-memory & performance oriented synchronous queue
- I generally make it a practice to denest w/ inversion.
  Increases readability & code is more concise
- Having TaskServiceImpl implement TaskService allows for clear separation of concerns
  & clear documentation in addition to declarative typing of each function
Cons
- My current implementation doesn't take into account load balancers & other scalability concerns
- Dependency on Redis adds complexity to deployment & introduces point of failure incase
  of depreciation or improper setup
- The task queue management is very basic, only allowing for enqueue to the end of the list 
  & dequeue from the start of the list. Complex queue management is lacking
```

## Question 2
#### Suppose there is a new requirement to persist the task progress data for disaster-recovery and audit purposes. How would you persist the data into a SQL database e.g. MySQL/PostgreSQL? Please document your design, including database schema, queries corresponding to the TaskService interface, and any other relevant materials.
```sql

table task_list
----------------------------------------
task_id varchar(255) | data varchar(255)
----------------------------------------
    "uuid"           |    "Test 1"
    
table task_result
----------------------------------------
task_id varchar(255) | result bit(1)
----------------------------------------
    "uuid"           |    0
```
#### I wasn't able to complete this question because of time pressure. 
