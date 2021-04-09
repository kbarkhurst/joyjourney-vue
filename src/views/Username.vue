<template>
  <div class="container-fluid">
    <div class="row py-5">
      <div class="col-md-6 mx-auto">
        <div class="username">
          <h1>What Brought You Joy Today?</h1>
          <form>
            <div class="form-group">
              <textarea class="form-control" id="broughtjoy" rows="6"></textarea>
            </div>
            <div class="form-group mt-3">
              <button type="submit" class="btn btn-primary btn-lg">Add Joy</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="row bg-light py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <h2>Search your Joy Journey</h2>
          <form class="card card-sm">
            <div class="card-body row no-gutters align-items-center">
              <div class="col-auto">
                <i class="fas fa-search h4 text-body"></i>
              </div>
              <!--end of col-->
              <div class="col">
                <input
                  class="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Enter Joyful Search Term"
                />
              </div>
              <!--end of col-->
              <div class="col-auto">
                <button class="btn btn-lg btn-success" type="submit">Search</button>
              </div>
              <!--end of col-->
            </div>
          </form>
        </div>
        <!--end of col-->
      </div>
    </div>
    <div class="row py-5">
      <p>Select Date Range to Filter Joys</p>
      <h2>My Joys</h2>
      <div class="my-4">
        <p class="mb-0">First snow at our new home. A hot tub morning with the kiddos before school!</p>
        <small class="text-uppercase">Dateline | Public | Edit</small>
      </div>
      <div class="my-4">
        <p class="mb-0">
          My 4-year old, "Guess what Mamma...I know the name of the boat the Pilgrims were on..the Cauliflower!
        </p>
        <small class="text-uppercase">Dateline | Public | Edit</small>
      </div>
      <div class="my-4">
        <p class="mb-0">
          Caleb held Abigail as we read a book about baby toes, noses, legs, arms and fingers. After each section the
          book asks, Who loves you? He giggles and kisses her - Me, I do. So incredibly sweet!
        </p>
        <small class="text-uppercase">Dateline | Private | Edit</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control-borderless {
  border: none;
}

.form-control-borderless:hover,
.form-control-borderless:active,
.form-control-borderless:focus {
  border: none;
  outline: none;
  box-shadow: none;
}
</style>
