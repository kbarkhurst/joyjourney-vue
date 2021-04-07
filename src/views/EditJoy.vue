<template>
  <div class="container">
    <h1>Edit your joy</h1>
    <div class="row">
      <div class="col-md-6">
        <form>
          <div class="form-group">
            <label for="visibility">Visibility</label>
            <select class="form-control" id="visibility">
              <option>Private Joy</option>
              <option>Public Joy</option>
            </select>
          </div>
        </form>
      </div>
      <textarea class="form-control my-3" id="broughtjoy" rows="6">
          First snow at our new home. A hot tub morning with the kiddos before school!
        </textarea
      >
      <form>
        <div class="form-group mt-3">
          Cancel
          <button type="submit" class="btn btn-primary btn-lg">Resubmit Joy</button>
        </div>
      </form>
    </div>
  </div>
</template>
