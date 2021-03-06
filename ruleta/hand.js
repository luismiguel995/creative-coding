function Hand(r) {
  this.r = r;
  this.theta = 0;
  this.omega = 0;
  this.alphaFriction = 0;
  this.alphaImpulse = random(0.0005, 0.0015);
  this.impulseLife = 0;
  this.frictionCoefficient = this.alphaImpulse * random(0.05, 0.1);
  this.maxOmega = 0.04;
  this.handWith = 10;
  this.addImpulses = false;

  this.moveMouse = function() {
    var tMouseX = mouseX - width / 2;
    var tMouseY = mouseY - height / 2;
    var originX = width / 2;
    var originY = height / 2;
    this.theta = atan2(tMouseY, tMouseX);
    if (this.theta < 0) {
      this.theta += TAU;
    }
  }

  this.movePhysics = function() {
    this.alphaFriction = -this.omega;

    if (this.alphaFriction != 0) {
      this.alphaFriction /= abs(this.alphaFriction);
    }
    this.alphaFriction *= this.frictionCoefficient;

    if (this.addImpulses) {
      this.addImpulse(1);
    }
    if (this.impulseLife > 0) {
      this.impulseLife--;
      this.omega += this.alphaImpulse;
    }
    this.omega += this.alphaFriction;

    if (this.omega < 0.0001) {
      this.omega = 0;
    }

    this.theta += this.omega;
    if (this.theta >= TAU) {
      this.theta -= TAU;
    }
  }

  this.move = this.movePhysics;

  this.draw = function() {
    stroke(255);
    rotate(this.theta)
    fill(30, 230, 250);
    noStroke();
    triangle(0, this.handWith, 0, -this.handWith, this.r, 0);
    rotate(-this.theta)
  }

  this.update = function() {
    this.move();
    this.draw();
  }

  this.addImpulse = function(frames=1) {
    if(this.omega < this.maxOmega) {
      this.impulseLife += frames;
    }
  }
}
